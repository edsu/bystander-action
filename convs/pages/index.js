import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Graph from '../components/graph'

import manifest from '../public/data/manifest.json'
import styles from '../styles/index.module.css'

export default function Home() {

  let defaults = []
  if (typeof window !== 'undefined' && window.location.hash) {
    defaults = decodeURI(window.location.hash.replace('#', '')).split(/::/)
    console.log(defaults)
  }

  const platforms = ['twitter', 'reddit']
  const [platform, setPlatform] = useState(defaults[0] || platforms[0])

  const queries = Object.keys(manifest)
  const [query, setQuery] = useState(defaults[1] || queries[0])

  const convs = manifest[query][platform]
  const [conv, setConv] = useState(defaults[2] || convs[0])

  const [graph, setGraph] = useState({edges: [], nodes: []})

  const resetConv = (platform, query) => {
    setQuery(query)
    setPlatform(platform)

    const conv = manifest[query][platform][0]
    setConv(conv)

  }

  useEffect(() => {
    const loc = window.location 
    const url = `${loc.protocol}//${loc.host}${loc.pathname}/data/${conv}`
    const fetchData = async () => {
      const resp = await fetch(url)
      const data = await resp.json()
      setGraph(data)
    }
    fetchData()
    window.location.hash = `${platform}::${query}::${conv}`
  }, [conv])

  return (
    <Layout>

      <div id="menu" className={styles.menu}>

        <div className={styles.menuItem}>
          <div className={styles.label}>Platform</div>
          <select value={platform} onChange={e => resetConv(e.target.value, query) }>
            {platforms.map(p => (
              <option key={`platform-${p}`}>{p}</option>
            ))}
          </select>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.label}>Query</div>
          <select value={query} onChange={e => resetConv(platform, e.target.value) }>
            {queries.map(q => (
              <option value={q} key={`query-${q}`}>&quot;{q}&quot;</option>
            ))}
          </select>
        </div>

        <div className={`${styles.menuItem} ${styles.conv}`}>
          <div className={styles.label}>Conversation</div>
          <select value={conv} onChange={e => setConv(e.target.value)}>
            {convs.map(c => {
              const convId = c.match(/30_(.*).json/)[1]
              return (
                <option key={`conv-${c}`} value={c}>{convId}</option>
              )
            })}
          </select>
        </div>

      </div>

      <Graph edges={graph.edges} nodes={graph.nodes} />

    </Layout>
  )
}
