import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { getViewpointData } from '../../services/viewpoints';

import DetailViewpoint from './DetailViewpoint';
import { ComparePictures } from './ComparePictures';

import NavTitle from './NavTitle';
import Gallery from '../../components/Gallery';

import './viewpoint.scss';
import { context } from './context';

const VIEW_COMPARE = 'compare';
const { Provider } = context;

export class Viewpoint extends React.Component {
  state = {
    viewpoint: {},
    selectedPictures: [null, null],
    draggablePicture: {},
  };

  static defaultProps = {
    mapPosition: {},
  };

  constructor (props) {
    super(props);
    const { isNavBarVisible, toggleNavBar } = props;
    isNavBarVisible && toggleNavBar();
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props;
    this.getDataViewpoints(id);
  }

  componentWillUnmount () {
    this.isUnmount = true;
  }

  /**
   * Get last picture of a viewpoint
   * @param idViewpoint
   * @returns {Promise<void>}
   */
  async getDataViewpoints (idViewpoint) {
    const viewpoint = await getViewpointData(idViewpoint);
    if (this.isUnmount) {
      return;
    }
    const { pictures: [picture = null] = [] } = viewpoint;

    this.setState({
      viewpoint,
      selectedPictures: [picture, null],
    });
  }

  /**
   * Update current picture to display
   * @param picture
   */
  handleClickPicture = picture => {
    const { match: { params: { imageView } } } = this.props;
    if (imageView !== VIEW_COMPARE) {
      this.setState({ selectedPictures: [picture, null] });
    } else {
      this.compareAction(picture);
    }
  };

  /**
   * Get the picture dragged
   * @param picture
   */
  handleDragPicture = picture => {
    this.setState({ draggablePicture: picture });
  };

  /**
   * Update pictures to compare
   * Deselect a picture if its already present
   * @param index
   */
  handleDropPicture = async index => {
    const { draggablePicture } = this.state;
    if (this.isPictureSelected(draggablePicture)) {
      await this.deselectPicture(draggablePicture);
      if (this.isUnmount) {
        return;
      }
    }
    const { selectedPictures } = this.state;
    const newSelectedPicture = [...selectedPictures];
    if (draggablePicture && draggablePicture.file) {
      newSelectedPicture[index] = draggablePicture;
      this.setState({ selectedPictures: [...newSelectedPicture] });
    }
  };

  /**
   * Select a picture to compare
   * @param picture
   */
  selectPicture = picture => {
    const { selectedPictures } = this.state;
    const freeSlotIndex = selectedPictures.findIndex(selectedPicture =>
      !selectedPicture);
    const newSelectedPicture = [...selectedPictures];
    newSelectedPicture[freeSlotIndex] = picture;
    this.setState({ selectedPictures: [...newSelectedPicture] });
  };

  /**
   * Deselect a picture to compare
   * @param picture
   */
  deselectPicture = picture => {
    const { selectedPictures } = this.state;
    const indexPicture = selectedPictures.findIndex(selectedPicture =>
      selectedPicture && selectedPicture.id === picture.id);
    const newSelectedPicture = [...selectedPictures];
    newSelectedPicture[indexPicture] = null;
    this.setState({ selectedPictures: [...newSelectedPicture] });
  };

  /**
   * Checked if picture is already selected
   * @param picture
   * @returns {boolean}
   */
  isPictureSelected = picture => {
    const { selectedPictures } = this.state;
    return selectedPictures.some(selectedPicture =>
      selectedPicture && selectedPicture.id === picture.id);
  };

  /**
   * Action to manage comparaison onClick
   * @param picture
   */
  compareAction (picture) {
    if (this.isPictureSelected(picture)) {
      this.deselectPicture(picture);
    } else {
      this.selectPicture(picture);
    }
  }

  render () {
    const {
      isNavBarVisible,
      toggleNavBar,
      match: { params: { imageView } },
      mapPosition: { lat, lng, zoom },
    } = this.props;
    const {
      viewpoint,
      viewpoint: { pictures },
      selectedPictures,
      selectedPictures: [currentPicture],
    } = this.state;
    const {
      handleClickPicture,
      handleDragPicture,
      handleDropPicture,
    } = this;
    const draggable = imageView === VIEW_COMPARE;
    const mapUrl = lat ? `/#${zoom}/${lat}/${lng}` : '/';
    const to = imageView === VIEW_COMPARE ? '/viewpoint/{{id}}' : mapUrl;

    if (!viewpoint) return null;
    return (
      <Provider value={{ viewpoint, currentPicture }}>
        <div>
          <NavTitle
            to={to}
            viewpoint={viewpoint}
            isNavBarVisible={isNavBarVisible}
            toggleNavBar={(to === mapUrl) && toggleNavBar}
          />
          <Gallery
            pictures={pictures}
            handleClickPicture={handleClickPicture}
            handleDragPicture={handleDragPicture}
            selectedPictures={selectedPictures}
            draggable={draggable}
          />
          <Switch>
            <Route
              exact
              path="/viewpoint/:id/compare"
              render={() => (
                <ComparePictures
                  selectedPictures={selectedPictures}
                  handleDropPicture={handleDropPicture}
                />
              )}
            />
            <Route
              exact
              render={() => <DetailViewpoint picture={currentPicture} />}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default Viewpoint;
