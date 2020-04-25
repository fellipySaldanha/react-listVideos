import React, { Component } from 'react';
import './App.css';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoCine from './components/VideoCine';
import {VideoService} from './services/VideoService';
import {Channel} from './services/EventService';
import VideoInline from './components/VideoInline';

class App extends Component {

  constructor(props){
    super(props);
    
    this.inlineVideo = React.createRef();
    this.cineVideo = React.createRef();

    this.state = {
      videos: [],
      selectedVideo:{},
      videoCointainerElement: this.inlineVideo
    }
   
    this.selectVideo = this.selectVideo.bind(this);
    this.toggleCinema = this.toggleCinema.bind(this);
  }

  async componentDidMount(){
    const videos = await VideoService.list();
    console.log(videos)
    this.setState({videos});
    Channel.on('video:select', this.selectVideo);    
    Channel.on('video:toggleCinema', this.toggleCinema);
  }

  componentWillUnmount(){
    Channel.removeListener('video:select', this.selectVideo);
    Channel.removeListener('video:toggleCinema', this.toggleCinema);    
  }

  selectVideo(video){
    this.setState({
      selectedVideo: video
    });
  }

  toggleCinema(){
    const currentElement = this.state.videoCointainerElement,
    newContainer = currentElement === this.inlineVideo ? this.cineVideo : this.inlineVideo;

    this.setState({
      videoCointainerElement: newContainer
    });
  }

  render(){
    const {state} = this;
    return (
      <div className="App">
        <VideoInline>
          <div ref={this.inlineVideo}></div>
        </VideoInline>
        <VideoPlayer video={state.selectedVideo} container={state.videoCointainerElement.current}/>
        <VideoList videos={state.videos}/>
        <VideoCine isActive={state.videoCointainerElement === this.cineVideo}>
          <div ref={this.cineVideo}></div>
        </VideoCine>
      </div>
    );
  }
}

export default App;
