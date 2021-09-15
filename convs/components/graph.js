import React from 'react'
import GraphVis from 'react-graph-vis'
import styles from '../styles/graph.module.css'

export default function Graph({ nodes, edges }) {

  // this will hold the vis.js network object
  let network = null

  const graph = {
    nodes: nodes.map(n => ({
      ...n, 
      color: getNodeColor(n),
    })),
    edges: edges.map(([n1, n2]) => ({from: n1, to: n2}))
  }

  let width = 1200
  let height = 800
  if (typeof window !== "undefined") {
    width = window.innerWidth - 40
    const box = document.getElementById("menu").getBoundingClientRect()
    height = window.innerHeight - box.top - 100
  }

  const options = {
    layout: {
      hierarchical: true
    },
    nodes: {
    },
    width: `${width}px`,
    height: `${height}px`,
  }

  const events = {
    'doubleClick': click => {
      const nodeId = click.nodes[0]
      const node = network.body.data.nodes.get(nodeId)
      window.open(node.url, '_blank')
    }
  }

  return (
    <div className={styles.graph}>
      <section className={styles.vis}>
        <GraphVis 
          key={Math.random()}
          graph={graph}
          options={options}
          events={events}
          nodes={nodes} edges={edges} 
          getNetwork={n => {network = n}} />
      </section>
    </div>
  )
}

function getNodeColor(node) {
  const s = node.sentiment
  const n = Math.floor(Math.abs(s) * 100)
  if (s > 0) {
    return `hsla(127, ${n}%, 50%, 1)`
  } else {
    return `hsla(0, ${n}%, 50%, 1)`
  }
}