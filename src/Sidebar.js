import React, { Component } from 'react'

class Sidebar extends Component {
  componentDidMount() {
    this.props.setSidebarCanvas(this.side_canvas)
    this.handleSelectAlgorithm = this.handleSelectAlgorithm.bind(this)
  }

  handleSelectAlgorithm(e) {
    let v = e.target.value
    this.props.selectAlgorithm(v)
  }

  render() {
    let {
      sidebar_orientation,
      sidebar_image_size,
      grem,
      p,
      hover_index,
      beta5VAE_labels,
      beta250VAE_labels,
      beta1VAE_labels,
      jointVAE_labels,
      labeling_keys,
      city_names,
      color_array,
      algorithm_options,
      algorithm_choice,
    } = this.props
      //console.log(city_names)
      //console.log(mnist_labels[3381])
      //console.log(this.props[this.props.labeling_keys[algorithm_choice]])
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1
        }}
      >
        <div>
          {' '}
          <div
            style={{
              padding: grem / 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color:'#000',
            }}
          >
            <div>Architecture:</div>
            <select
              onChange={this.handleSelectAlgorithm}
              value={algorithm_options[algorithm_choice]}
            >
              {algorithm_options.map((option, index) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection:
                sidebar_orientation === 'horizontal' ? 'row' : 'column',
            }}
          >
            <div>
              <canvas
                ref={side_canvas => {
                  this.side_canvas = side_canvas
                }}
                width={sidebar_image_size}
                height={sidebar_image_size}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  background: hover_index
                    ? `rgb(${color_array[this.props[this.props.labeling_keys[algorithm_choice]][hover_index] + 1].join(',')})`
                    : 'transparent',
                  color: '#000',
                  padding: p(grem / 4, grem / 2),
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'all 0.1s linear',
                }}
              >
                <div>Label:</div>
                {hover_index ? <div>{this.props[this.props.labeling_keys[algorithm_choice]][hover_index]}</div> : null}
              </div>
              <div
                style={{
                    //
                  color: '#000',
                  padding: p(grem / 4, grem / 2),
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                Name:
                {hover_index ? <div>{city_names[hover_index]}</div> : null}
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: grem / 2 }}>
          <div>
            An interactive UMAP visualization of a dataset of urban forms, clustered based on VAE encodings.{' '}
            <button
              onClick={() => {
                this.props.toggleAbout(true)
              }}
            >
              About
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
