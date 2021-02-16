import React from 'react';
import { Button, Collapse } from '@blueprintjs/core';

import './collapsible-panel.scss';

export class CollapsiblePanel extends React.PureComponent {
  state = {
    isOpen: true,
  };

  static defaultProps = {
    initialState: true,
  };

  componentDidMount() {
    const { initialState } = this.props;
    this.setState({
      isOpen: initialState,
    });
  }

  handleClick = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));

  render() {
    const { isOpen } = this.state;
    const { title, children } = this.props;
    const chevronState = isOpen ? 'up' : 'down';
    return (
      <div className="collapsible-panel">
        <div className="collapsible-panel--title">
          <h3>{title}</h3>
          <Button onClick={this.handleClick} icon={`chevron-${chevronState}`} />
        </div>
        <Collapse keepChildrenMounted isOpen={isOpen}>
          {children}
        </Collapse>
      </div>
    );
  }
}

export default CollapsiblePanel;
