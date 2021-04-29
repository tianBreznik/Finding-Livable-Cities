import React, { Component } from 'react'
import Layout from './Layout'
import * as _ from 'lodash'
import * as d3 from 'd3'

let algorithm_options = ['Beta VAE - Beta:5', 'Beta VAE - Beta:250', 'VAE - (Beta: 1)', 'JointVAE']
let algorithm_embedding_keys = [
  'beta5_embeddings',
  'beta250_embeddings',
  'beta1_embeddings',
  'joint_embeddings',
]

let labeling_keys = [
    'beta5VAE_labels',
    'beta250VAE_labels',
    'beta1VAE_labels',
    'jointVAE_labels',
]

class Data extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beta5_embeddings: null,
      beta250_embeddings: null,
      beta5VAE_labels: null,
      beta250VAE_labels: null,
      beta1VAE_labels: null,
      city_names: null,
      beta1_embeddings: null,
    }
  }

  scaleEmbeddings(embeddings) {
    let xs = embeddings.map(e => Math.abs(e[0]))
    let ys = embeddings.map(e => Math.abs(e[1]))
    let max_x = _.max(xs)
    let max_y = _.max(ys)
    let max = Math.max(max_x, max_y)
    let scale = d3
      .scaleLinear()
      .domain([-max, max])
      .range([-20, 20])
    let scaled_embeddings = embeddings.map(e => [scale(e[0]), scale(e[1])])
    return scaled_embeddings
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_clusterable_embedings.json`)
      .then(response => response.json())
      .then(beta5_embeddings => {
        let scaled_embeddings = this.scaleEmbeddings(beta5_embeddings)
        console.log('got em')
        this.setState({
          beta5_embeddings: scaled_embeddings,
        })
      })
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_clusterable_embedings_beta250VAE_umap08.json`)
      .then(response => response.json())
      .then(beta250_embeddings => {
        let scaled_embeddings = this.scaleEmbeddings(beta250_embeddings)
        console.log('got em')
        this.setState({
          beta250_embeddings: scaled_embeddings,
        })
      })
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_clusterable_embedings_beta1VAE_umap08.json`)
      .then(response => response.json())
      .then(beta1_embeddings => {
        let scaled_embeddings = this.scaleEmbeddings(beta1_embeddings)
        console.log('got em')
        this.setState({
            beta1_embeddings: scaled_embeddings,
        })
      })
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_clusterable_embedings_JointVAE_umap08.json`)
      .then(response => response.json())
      .then(joint_embeddings => {
        let scaled_embeddings = this.scaleEmbeddings(joint_embeddings)
        console.log('got em')
        this.setState({
            joint_embeddings: scaled_embeddings,
        })
      })
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_hdbscan_LABELS.json`)
      .then(response => response.json())
      .then(beta5VAE_labels =>
        this.setState({
          beta5VAE_labels: beta5VAE_labels,
        })
      )
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_hdbscan_LABELS_beta250VAE_umap08.json`)
       .then(response => response.json())
       .then(beta250VAE_labels =>
         this.setState({
           beta250VAE_labels: beta250VAE_labels,
        })
     )
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_hdbscan_LABELS_beta1VAE_umap08.json`)
       .then(response => response.json())
       .then(beta1VAE_labels =>
         this.setState({
           beta1VAE_labels: beta1VAE_labels,
        })
     )
    fetch(`${process.env.PUBLIC_URL}/min_dist_01_umap_citydataset_hdbscan_LABELS_JointVAE_umap08.json`)
        .then(response => response.json())
        .then(jointVAE_labels =>
          this.setState({
            jointVAE_labels: jointVAE_labels,
        })
     )
    fetch(`${process.env.PUBLIC_URL}/citydataset_pointnames.json`)
       .then(response => response.json())
       .then(city_names =>
         this.setState({
           city_names: city_names,
         })
      )
  }

  render() {
    //console.log(this.state)
    return this.state.beta5_embeddings && this.state.beta250_embeddings && this.state.city_names  ? (
      <Layout
        {...this.state}
        algorithm_options={algorithm_options}
        algorithm_embedding_keys={algorithm_embedding_keys}
        labeling_keys = {labeling_keys}
      />
    ) : (
      <div style={{ padding: '1rem' }}>Loading data...</div>
    )
  }
}

export default Data
