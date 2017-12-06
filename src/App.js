import React, { Component } from 'react';
import { scale, contrast } from 'chroma-js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color1: null,
      color2: null,
      numberOfColors: 0,
    }
  }

  submitColours = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  handleChange = (colorType, event) => {
    const { value } = event.target;
    if (value.length >= 4) {
      const colors = {};
      colors[colorType] = value;
      this.setState(colors);
    }
  }

  renderAllColours = () => {
    if (this.state.color1 && this.state.color2 && this.state.numberOfColors) {
      return ['lch', 'lab', 'rgb', 'hsv'].map((colorMode) => (
        <div style={{ margin: '0 -10px' }}>
          <p><strong>Colour Space: {colorMode.toUpperCase()}</strong></p>
          {scale([this.state.color1, this.state.color2])
            .mode(colorMode)
            .colors(this.state.numberOfColors)
            .map((item) => (
              <div
                key={`${item}${colorMode}`}
                style={{ backgroundColor: item }}
                className="color-palette-slide"
              >
                <p
                  className="color-item"
                  style={{ color: contrast(item, '#fff') >= 4.5 ? '#fff' : '#000' }}
                >{item}</p>
              </div>
          ))}
        </div>
      ));
    }
  }

  checkContrastRatio = () => {
    if ((this.state.color1 && this.state.color2) &&
        (this.state.color1.length >= 4 && this.state.color2.length >= 4)) {
      const { color1, color2 } = this.state;
      const doesMeet = contrast(color1, color2) >= 4.5 ? '' : 'do not ';
      const message = `Your colours ${doesMeet}meet the WCAG colour contrast ratio of 4.5:1`;
      return <p>{message}</p>;
    }
  }

  render () {
    return (
      <div className="App">
        <header>
          <h1>The Chromifier</h1>
        </header>
        <section>
          <h2>Please insert two colours (you need the hex code including the '#')</h2>
          <form onSubmit={this.submitColours}>
            <div className="input-group">
              <div className="color-square" style={{ backgroundColor: this.state.color1 || '#fff' }} />
              <label htmlFor="color1">First Colour</label>
              <input type="text" id="color1" onChange={(e) => this.handleChange('color1', e)} />
            </div>
            <div className="input-group">
              <div className="color-square" style={{ backgroundColor: this.state.color2 || '#fff' }} />
              <label htmlFor="color2">Second Colour</label>
              <input type="text" id="color2" onChange={(e) => this.handleChange('color2', e)} />
            </div>
            <div className="input-group">
              <div className="color-square" />
              <label htmlFor="colorNumber">Number of Colours</label>
              <input type="text" id="colorNumber" onChange={(e) => this.setState({numberOfColors: e.target.value})} />
            </div>
          </form>
        </section>
        <section className="App-intro">
          {this.checkContrastRatio()}
          <p>Here is a list of colours recommended based of the different spaces:</p>
          {this.renderAllColours()}
          <p>
            To understand more about Colour Spaces, visit&nbsp;
            <a href="https://en.wikipedia.org/wiki/Color_space">The Wikipedia page</a>
          </p>
        </section>
      </div>
    );
  }
}
  

export default App;
