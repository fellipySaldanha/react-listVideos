import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Channel} from '../services/EventService';

class VideoPlayer extends Component{

    constructor(props){
        super(props);
        this.videoElement = React.createRef();
        this.currentTime = 0;
        this.toggleCinema = this.toggleCinema.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onStop = this.onStop.bind(this);
    }
    
    toggleCinema(){
        this.onStop();
        Channel.emit('video:toggleCinema');
    }

    onPlay(){
        this.videoElement.current.currentTime = this.currentTime;
    }

    onStop(){
        this.currentTime = this.videoElement.current.currentTime;
    }

    componentDidUpdate(prevProps){
        if (this.props.video.url !== prevProps.video.url) {
            this.currentTime = 0;
        }
    }

    render(){
        const {container, video} = this.props;
        
        if(!video.url){
            return '';
        }
        else if(!container){
            return 'Carregando';
        }
        else{
            const element = (
                <div className='video-player'>
                    <video 
                    onPlay={this.onPlay}
                    onStop={this.onStop}
                    ref={this.videoElement}
                    src={video.url} 
                    controls autoPlay loop/>
                    <button onClick={this.toggleCinema}>[ ]</button>
                </div>
            );
            return ReactDom.createPortal(element, container);
        }        
    }
}

export default VideoPlayer;