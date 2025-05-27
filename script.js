function init() {
  const $ = go.GraphObject.make;

  const myDiagram = $(go.Diagram, "familyTreeDiagram", {
    layout: $(go.TreeLayout, { angle: 90, layerSpacing: 40 }),
    "undoManager.isEnabled": true,
    "allowMove": false,
    "allowDragOut": false,
    "allowRelink": false,
    "allowCopy": false,
    "allowDelete": false
  });

  // Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Vertical",
      {
        movable: false,
        click: (e, node) => {
          const personId = node.data.key;

          // Dynamically determine current folder
          const currentFolder = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0];
          window.location.href = `profile-${currentFolder}.html?id=${personId}`;
        }
      },
      $(go.Panel, "Auto",
        $(go.Shape, "RoundedRectangle",
          { fill: "#E3F2FD", stroke: "#2196F3", strokeWidth: 2 }),
        $(go.Panel, "Table",
          { margin: 6 },
          $(go.TextBlock,
            { row: 0, column: 0, font: "bold 12pt sans-serif" },
            new go.Binding("text", "name")),
          $(go.TextBlock,
            { row: 1, column: 0, font: "italic 10pt sans-serif", stroke: "#555" },
            new go.Binding("text", "spouse", s => s ? `Spouse: ${s}` : ""))
        )
      ),
      $("TreeExpanderButton")
    );

  // Link template
  myDiagram.linkTemplate =
    $(go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

  // Load model
  myDiagram.model = new go.GraphLinksModel(familyData.nodes, familyData.links);
}
