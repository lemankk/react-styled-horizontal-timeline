# React Horizontal Timeline (Styled-Component)


A react & styled-component port of the horizontal time-line developed by CodyHouse & @sherubthakur.

## Demo

- Enhanced version [demo](http://lemankk.github.io/react-styled-horizontal-timeline) 
- Original [demo](http://sherubthakur.github.io/react-horizontal-timeline) 

## HorizontalTimeline

It will just render a timeline with the dates that you provided and it is up to you what to do when a date is selected. i.e. it will give you the index of the date that was clicked and you can do anything with it.

Property	                  |	Type   	     |	Default	                      |	Description
:--------------------------|:--------------|:-------------------------------|:--------------------------------
 values (**required**)     | array         | undefined                      | **sorted** array of dates (format:**yyyy-mm-dd**)
 indexClick (**required**) | function      | undefined                      | function that takes the index of the array as argument
 index (**required**)      | number        | undefined                      | the index of the selected date
 getLabel                  | function      | date.toDateString().substring(4) |  A function to calculate the label of the event based on the date of the event
 minEventPadding           | number        | 20                             | The minimum padding between two event labels
 maxEventPadding           | number        | 120                            | The maximum padding between two event labels
 linePadding               | number        | 100                            | Padding used at the start and end of the timeline
 labelWidth                | number        | 85                             | The width of an individual label
 fillingMotion             | object        |{ stiffness: 150, damping: 25 } | Sets the animation style of how filling motion will look
 slidingMotion             | object        |{ stiffness: 150, damping: 25 } | Sets the animation style of how sliding motion will look
 styles                    | object        |{ background: '#f8f8f8', foreground: '#7b9d6f', outline: '#dfdfdf', label: '#333' } | object containing the styles for the timeline currently outline (the color of the boundaries of the timeline and the buttons on it's either side), foreground (the filling color, active color) and background (the background color of your page) colors of the timeline can be changed.
 isTouchEnabled            | boolean       | true                           | Enable touch events (swipe left, right)
 isKeyboardEnabled         | boolean       | true                           | Enable keyboard events (up, down, left, right)
 isOpenBeginning           | boolean       | true                           | Show the beginning of the timeline as open ended
 isOpenEnding              | boolean       | true                           | Show the ending of the timeline as open ended
 isControlBarEnabled              | boolean       | true                           | Show control bar 
 isBackEnabled              | boolean       | true                           | Show back button 
 isForwardEnabled              | boolean       | true                           | Show forward button 
 isBackFaderEnabled              | boolean       | true                           | Show fade-out layer on top of the event dots at left side 
 isForwardFaderEnabled              | boolean       | true                           | fade-out layer on top of the event dots at right side
 barComponent              | React.SFC       | null                           |  Custom element for rendering container contains line and dot
 dotComponent              | React.SFC       | null                           |  Custom element for dot
 lineComponent              | React.SFC       | null                           |  Custom element for line
 controlButtonComponent              | React.SFC       | null                           |  Custom element for control button
 backButtonContent              | React.SFC       | null                           |  Custom element for back button content
 forwardButtonContent              | React.SFC       | null                           |  Custom element for back button content
This is how it can be used.

```
const VALUES = [ /* The date strings go here */ ];

export default class App extends React.Component {
  state = { value: 0, previous: 0 };

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            values={ VALUES } />
        </div>
        <div className='text-center'>
          {/* any arbitrary component can go here */}    
          {this.state.value}
        </div>
      </div>
    );
  }
}

```
For more advanced usage take a look at the demos directory.

## Running the development version
- Just clone the repo and do an `npm install` (or `yarn install`)
- Note: You will need to do `npm install react react-dom` to install `peerDependencies` as both `yarn` and `npm` don't do this.
- Run `npm run start`/`npm start`/`yarn start`.
- Then go to `localhost:5001/demos/<demo_name>/index.html` to see the fruits of your labor.

#### Here is the information provided by the original author.

An easy to customize, horizontal timeline powered by CSS and jQuery.

[Article on CodyHouse](http://codyhouse.co/gem/horizontal-timeline/)

[Demo](https://codyhouse.co/demo/horizontal-timeline/index.html)

[Terms](http://codyhouse.co/terms/)
