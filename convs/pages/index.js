import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Graph from '../components/graph'

import manifest from '../public/data/manifest.json'
import styles from '../styles/index.module.css'

export default function Home() {

  const platforms = ['twitter', 'reddit']
  const [platform, setPlatform] = useState(platforms[0])

  const queries = Object.keys(manifest)
  const [query, setQuery] = useState(queries[0])

  const convs = manifest[query][platform]
  const [conv, setConv] = useState(convs[0])

  const [graph, setGraph] = useState({edges: [], nodes: []})

  const resetConv = (platform, query) => {
    setQuery(query)
    setPlatform(platform)
    setConv(manifest[query][platform][0])
  }

  useEffect(() => { 
    const url = new URL(`data/${conv}`, window.location + '/')
    const fetchData = async () => {
      const resp = await fetch(url)
      const data = await resp.json()
      setGraph(data)
    }
    fetchData()
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
              <option key={`query-${q}`}>{q}</option>
            ))}
          </select>
        </div>

        <div className={styles.menuItem}>
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