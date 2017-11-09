function bfs(rootNode, vertices, edges) {
  rootNode.distance = 0
  let queue = []
  queue.push(rootNode)
  let discovered = [rootNode]
  while (queue.length > 0) {
    let currentNode = queue.shift()
    let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
    markDistanceAndPredecessor(currentNode, adjacentNodes)
    queue = queue.concat(adjacentNodes)
    discovered = discovered.concat(adjacentNodes)
  }
  return discovered
}

function findAdjacent(nodeName, vertices, edges) {
  let startingNode = vertices.filter(node => node.name === nodeName)[0]
  let startingNodeIndex = vertices.indexOf(startingNode)
  let matchingEdges = edges.filter(edge => edge.includes(nodeName))
  let matches = [];
  matchingEdges.map(edge => {
    edge.map(edgeName => {
      vertices.map((vertex, index) => {
        if (vertex.name === edgeName && !matches.includes(vertex) && index > startingNodeIndex) {
          matches.push(vertex)
        }
      })
    })
  })
  return matches
}

function markDistanceAndPredecessor(node, adjacentNodes) {
  adjacentNodes.map (currentNode => {
    currentNode.predecessor = node
    currentNode.distance = node.distance + 1
  })
  return adjacentNodes
}
