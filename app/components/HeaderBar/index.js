/**
*
* HeaderBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { TweenMax } from 'gsap';
import { Button, Col, Row } from 'react-bootstrap/lib';

class HeaderBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillEnter(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
  }
  render() {
    const titleButtons = this.props.titles.map((title, index) => (<Button key={title} onClick={() => { this.props.onButtonClick(index); }}> {title} </Button>));
    return (
      <div ref={(c) => (this.container = c)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {titleButtons}
          </Col>
        </Row>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  titles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onButtonClick: PropTypes.func,
};

export default HeaderBar;
