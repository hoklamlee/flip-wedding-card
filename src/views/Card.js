import { height } from "@mui/system";
import React, { createRef } from "react";
import ReactDOM from "react-dom";
import HTMLFlipBook from "react-pageflip";
import "./Card.scss";
import Grid from '@mui/material/Grid';
import { isMobile, MobileView, BrowserView } from 'react-device-detect';
import cover from '../assets/cover.jpg';
import Background from '../assets/background.jpg';
import page2 from '../assets/page2.jpg';
import page3 from '../assets/page3.jpg';
import pattern from '../assets/pattern.png';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import MapIcon from '@mui/icons-material/Map';
import Resizer from "react-image-file-resizer";
import { Link } from 'react-router-dom';

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className={"page"} ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const PagePhoto = React.forwardRef((props, ref) => {
  return (
    <div className={"page " + props.pos} ref={ref} data-density="hard" >
      <div className="page-content photobackground" >
        {props.children}
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (

    <div className="page" ref={ref} data-density={props.density | "soft"}  >

      <div className="page-content" >
        {/* <div className="page-footer">{props.number + 1}</div> */}
        {/* <div
          className="page-image"
          style={{ backgroundImage: "url(images/html/" + props.image + ")" }}
        ></div> */}
        {/* <div className="page-text" >{props.children}</div> */}
        {props.children}
        {/* <div className="page-footer">{props.number + 1}</div> */}
      </div>
    </div>
  );
});

class Card extends React.Component {
  constructor(props) {
    super(props);

    const pages = [<Page>
      <div className="container" style={{ backgroundImage: `url(${Background})` }}>

        <div style={{ textAlign: "center", marginTop: 30 }} >
          <div className="playfair" style={{ marginTop: "50%", fontSize: 40 }}><b style={{ textTransform: "uppercase" }}>WEDDING</b></div>
          <div className="festive" style={{ fontSize: 30 }}>Invitation</div>

        </div>
      </div>
      </Page>,
    <Page>
      <div className="container" style={{ backgroundImage: `url(${pattern})` }}>
        <div className="center-image">
          <img src={cover} alt="" />
        </div>
      </div>
    </Page>,
    <Page key={1} number={1} >
      <div className="container" style={{ backgroundImage: `url(${Background})` }}>

        <div style={{ textAlign: "center", marginTop: 30 }} >
          <div className="festive" style={{ fontSize: 40 }}>Save The Date</div>
          <div className="playfair" style={{ marginTop: 10, fontSize: 20 }}>---Broom & Bride---</div>
          <div className="festive" style={{ marginTop: 10, fontSize: 40 }}>Are getting married</div>
          <div className="playfair" style={{ marginTop: 10, fontSize: 20 }}><b style={{ textTransform: "uppercase" }}>Location</b></div>

          <div className="playfair" style={{ marginTop: 20 }} >---Location Here---
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={(e) => window.open("https://goo.gl/maps/kbNqpHYt49qzkf9XA")}>
              <MapIcon />
            </IconButton></div>

          <div className="playfair" style={{ marginTop: 20, fontSize: 20 }}><b style={{ textTransform: "uppercase" }}>Date</b></div>
          <div className="playfair" style={{ marginTop: 20 }}>January 1, 2022</div>

          <div className="playfair" style={{ marginTop: 20, fontSize: 20 }}>
            <Link to="replyUs"  role="button" style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant="contained" style={{ backgroundColor: "black", color: "white" }}>
            <b style={{ textTransform: "uppercase" }}>REPLY US</b>
            </Button></Link>
 
            </div>
        </div>
      </div>
    </Page>,
    <Page>
      <div className="container" style={{ backgroundImage: `url(${pattern})` }}>
        <div className="center-image">
          <img src={page2} alt="" />
        </div>
      </div>
    </Page>,
    <Page>
      <div className="container" style={{ backgroundImage: `url(${pattern})` }}>
        <div className="center-image">
          <img src={page3} alt="" />
        </div>
      </div>
    </Page>];



    pages.push(<Page>
      <div className="container" style={{ backgroundImage: `url(${Background})` }}>

        <div style={{ textAlign: "center", marginTop: 30 }} >
        <div className="festive" style={{ marginTop: "50%", fontSize: 40 }}>Thank you</div>


        </div>
      </div>
      </Page>);

    this.state = {
      page: 0,
      totalPage: 0,
      orientation: 'landscape',
      state: 'read',
      pages: pages,
      width: 0, height: 0
    };

    this.flipBook = createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  updateWindowDimensions() {
    // console.log({ width: window.innerWidth, height: window.innerHeight })
    // this.setState({ width: window.outerWidth, height: window.outerHeight });
    this.setState({ width: window.innerWidth, height: window.innerHeight });

  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  }

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  }

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  }

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data,
    });
  }

  onChangeState = (e) => {
    this.setState({
      state: e.data,
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // this.setState({
    //   totalPage: this.flipBook.current.getPageFlip().getPageCount(),
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getHeight(height, width) {
    if (width > height) {
      if (isMobile) {
        return height;
      }

      return 1184;
    } else {
      if (isMobile) {
        return height;
      }

      return height;
    }
  }

  getWidth(height, width) {
    if (width > height) {
      if (isMobile) {
        return width;
      }

      return 834;
    } else {
      return width;
    }
  }

  render() {
    return (
      <div>
        {/* {isMobile?"Mobile":"Browser"} */}
        <Grid container spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>
          <Grid item height={isMobile ? "100vh" : (this.state.height > this.state.width ? "100vh" : "85vh")} width={isMobile ? "100vw" : (this.state.height > this.state.width ? "100vw" : "50vw")}>
            <div className="container-md" style={{ position: "relative" }}>
              <HTMLFlipBook
                width={this.getWidth(this.state.height, this.state.width)}
                height={this.getHeight(this.state.height, this.state.width)}

                // width={550}
                // height={733}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={this.onPage}
                onChangeOrientation={this.onChangeOrientation}
                onChangeState={this.onChangeState}
                startPage={1}
                className={"flip-book html-book demo-book"}
                // className={"flip-book html-book demo-book "}

                style={{ backgroundImage: "url(images/background.jpg)" }}
                ref={this.flipBook}

              // ref={(el) => this.flipBook = el}
              >
                {this.state.pages}
              </HTMLFlipBook>
            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default Card;

