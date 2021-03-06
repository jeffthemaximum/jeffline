import React from 'react';
import axios from 'axios';
import HoverSuggestion from "./HoverSuggestion"
import ShareApp from "../../timeline/components/ShareApp"
const reactStringReplace = require('react-string-replace')

const SuggestionApp = React.createClass({
  getInitialState(){
    return({
      inputText: "Jeff is a nice guy who likes to ride his bike and play Nintendo.",
      submitting: false,
      outputText: "",
      shareLink: "",
      fullScreen: this.props.fullScreen || false
    })
  },

  componentDidMount(){
    if (this.isShare()){
      this.setState({
        inputText: this.props.inputText
      }, this.handleSubmit)
    }
  },

  isShare(){
    return !!this.props.inputText
  },

  handleTextChange(e){
    this.setState({inputText: e.target.value})
  },

  handleResponse(response){
    const { difficult_words } = response.data
    let outputText = this.state.inputText
    let word;


    _.each(difficult_words, (data) => {
      word = data.word

      outputText = reactStringReplace(outputText, word, (match, i) => (
        <HoverSuggestion
          word={word}
          data={data}
          i={i}
        />
      ));
    })

    this.setState({
      outputText: outputText,
      shareLink: response.data.share_url
    })

  },

  handleSubmit(e){
    if (e) {
      e.preventDefault();
    }

    this.setState({submitting: true});

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    const data = {
      sentence: this.state.inputText,
    }

    axios.get("/suggest", {params: data}, requestConfig)

    .then(function(response){

      this.setState({
        submitting: false
      })

      this.handleResponse(response)

    }.bind(this))

    .catch(function(error){
      // TODO error messaging
      console.log(error);
      this.setState({submitting: false});

    }.bind(this))

  },

  isDisabled(){
    return (!!this.state.submitting)
  },

  buttonText(){
    if (!!this.state.submitting){
      return "Suggesting..."
    } else {
      return "Suggest!"
    }
  },

  render(){

    const textStyle = {
      "fontFamily": "\"proxima-nova\", Helvetica, Arial, sans-serif",
      "fontSize": "20px",
      "lineHeight": "2.0"
    }

    const shareLinkStyle = {
      paddingTop: "40px"
    }

    return(
      <section
        id="contact"
        className="suggestions"
      >
        { this.isShare() ?
          <div>
            <div className="section-content">
              <h1 className="section-header">Help figure out <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> hard words</span></h1>
              <h3>Hover over the yellow words for help OR 
                <a className="suggestion" onClick={() => window.location.href = "/suggestion"}> Click to try your own text</a>
              </h3>
            </div>
            <hr/>
            <div className="contact-section">
              <div className="container">
                <form>
                  <div 
                    style={textStyle}
                    className="col-lg-12 col-sm-12 form-line"
                  >
                    {this.state.outputText}
                  </div>
                </form>
              </div>
            </div>
          </div>
        :
          <div>
            <div className="section-content">
              <h1 className="section-header">Help figure out <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> hard words</span></h1>
              <h3>Enter some text. Suggestor will give you definitions and synonyms for the hard words</h3>
            </div>

            <div className="contact-section">
              <div className="container">
                <form>
                  <div className="col-lg-6 col-sm-12 form-line">
                    <div className="form-group">
                      <label for ="description"> Input text</label>
                      <textarea onChange={this.handleTextChange} className="form-control" id="description">
                        {this.state.inputText}
                      </textarea>
                    </div>
                    <div>
                      <button
                        onClick={this.handleSubmit}
                        type="button"
                        className="btn btn-default submit"
                        disabled={this.isDisabled()}
                      >
                        {this.buttonText()}
                      </button>
                    </div>
                    {
                      this.state.shareLink !== "" &&
                      <div style={shareLinkStyle} >
                        <ShareApp data={this.state} />
                      </div>
                    }
                  </div>
                  <div 
                    style={textStyle}
                    className="col-lg-6 col-sm-12 form-line"
                  >
                    {this.state.outputText}
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </section>
    )
  }
});

module.exports = SuggestionApp;

// deactivate button when submitting === true
// show gif while submitting === true
// change header
  // get rid of white
  // only link to back