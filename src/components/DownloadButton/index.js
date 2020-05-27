import React from 'react';

import PropTypes from 'prop-types';
import Api from '@terralego/core/modules/Api';
import { Spinner } from '@blueprintjs/core';
import saveAs from 'file-saver';

class DownloadButton extends React.Component {
  static propTypes = {
    filename: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    as: 'button',
  };

  state = {
    dowloading: false,
  };

  b64toBlob = (b64Data, sliceSize = 512) => {
    const byteCharacters = atob(b64Data.split(',')[1]);
    const byteArrays = [];
    const contentType = b64Data.split(':')[1].split(';')[0];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  handleDownloadClick = async event => {
    const { filename, endpoint } = this.props;
    this.setState({ dowloading: true });
    event.stopPropagation();

    let blob;
    if (endpoint.startsWith('data:')) {
      blob = this.b64toBlob(endpoint);
    } else if (endpoint.startsWith('http')) {
      blob = await (await fetch(endpoint, {
        responseType: 'blob',
      })).blob();
    } else {
      blob = await Api.request(endpoint, {
        responseType: 'blob',
      });
    }
    saveAs(blob, filename);
    this.setState({ dowloading: false });
  };


  render () {
    const { as, ...props } = this.props;
    const { dowloading } = this.state;
    const { handleDownloadClick } = this;
    const Component = dowloading ? Spinner : as;
    return (
      <Component {...props} onClick={event => handleDownloadClick(event)} />
    );
  }
}


export default DownloadButton;
