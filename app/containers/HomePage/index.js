/*
 * HomePage
 *
 * Get list location folders with: GET https://www.googleapis.com/drive/v2/files/1Iv8dHdXs7Vvdz0PC9lnU2fE-oBmXOIlh/children
 * Map over this list to convert IDs to strings with: GET https://www.googleapis.com/drive/v2/files/folderId
 * Get a list of each of the photos in each folder with: GET https://www.googleapis.com/drive/v2/files/folderId/children
 * Build URL for each of the photos with the following template: https://drive.google.com/uc?export=view&id=fileId
 * Refresh Token: 1/YEFQ_GC-IbEauYPBZ6HPleAV5IU0jkF_ytX0dmg8fNQ
 * Images loaded via Google drive load slowly; going to load them all prior to rendering
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from 'components/PhotoCard';
import HeaderBar from 'components/HeaderBar';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Modal, Spin, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TransitionGroup from 'react-addons-transition-group';

import injectSaga from 'utils/injectSaga';
// import { RESTART_ON_REMOUNT } from 'utils/constants';ss
import saga from './saga';

import messages from './messages';
import * as actions from './actions';
import { makeSelectTitleList, makeSelectUrlList, makeSelectDataRetrieved } from './selectors';
import Wrapper from './Wrapper';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activePage: null,
      loadedItems: [],
      showPageSpinner: false,
      showModalSpinner: false,
      showModal: false,
      modalUrl: '',
      modalImageLoaded: false,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    // console.log('MOUNT');
    this.props.onPageLoad();
  }
  onButtonClick = (index) => {
    // console.log('buttonclick', index);
    this.setState({ loadedItems: [] });
    this.setState({ activePage: index });
    this.setState({ showPageSpinner: true });
  }
  onPhotoClick(event) {
    console.log('show modal');
    this.setState({ modalUrl: event.target.src });
    this.setState({ showModal: true });
    // this.setState({ showModalSpinner: true });
  }

  onLoad(feedItem) {
    feedItem.persist();
    this.setState({ showPageSpinner: false });
    this.setState(() => ({ loadedItems: this.state.loadedItems.concat(feedItem.target.src) }));
  }

  onModalImageLoad() {
    console.log('modal image loaded');
    // this.setState({ showModalSpinner: false });
  }

  handleCloseModal() {
    this.setState({ modalUrl: '' });
    this.setState({ showModal: false });
    this.setState({ modalImageLoaded: false });
  }
  render() {
    const { titleList, urlList, dataRetrieved } = this.props;
    const { activePage, loadedItems, showModal, showPageSpinner } = this.state;

    const photoLoader = urlList.map((regionList) => (regionList.map((url) => (
      <img alt="" src={url} onLoad={this.onLoad} key={`${url}`} />
      ))));
    const loadedPhotos = loadedItems.map((url) =>
      // console.log(url);
       (
         <Col lg={4} sm={6} key={url}>
           <PhotoCard key={url} source={url} onClick={this.onPhotoClick} />
         </Col>
      ));
    const photosLoadIcon = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />;
    const pageSpinner = <div className="page-spinner"><Spin indicator={photosLoadIcon} /></div>;
    // const modalLoadIcon = <Icon type="loading" style={{ fontSize: 24, color: '#3a3535' }} spin />;
    // const modalSpinner = <div className="modal-spinner"><Spin indicator={modalLoadIcon} /></div>;
    return (
      <Wrapper>
        <div className="header-title">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <div className="photo-canvas">
          <Grid fluid>
            <TransitionGroup>
              {dataRetrieved && (<HeaderBar titles={titleList} onButtonClick={this.onButtonClick} />)}
              <Row>
                {loadedPhotos}
              </Row>
            </TransitionGroup>
          </Grid>
        </div>
        {showPageSpinner && pageSpinner}
        <div className="hidden">
          {photoLoader[activePage]}
        </div>
        <Modal
          visible={showModal}
          onCancel={this.handleCloseModal}
          footer={null}
          width={'80%'}
          closable={false}
        >
          {/* {showModalSpinner && modalSpinner} */}
          <div className="modal-image-wrapper">
            <img
              style={{ display: 'block', margin: '0 auto', maxHeight: '600px', maxWidth: '100%', objectFit: 'cover', overflow: 'hidden' }}
              alt=""
              src={this.state.modalUrl}
              className="modal-image"
              onLoad={this.onModalImageLoad}
            />
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  titleList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  urlList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  dataRetrieved: PropTypes.bool,
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataRetrieved: makeSelectDataRetrieved(),
  titleList: makeSelectTitleList(),
  urlList: makeSelectUrlList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad() {
      dispatch(actions.pageLoadAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'home', saga });
// const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(HomePage);
