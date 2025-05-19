
// para poder abrir el archivo es necesario tener instalado MySQL Workbench, no se visualiza directamente en el navegador


import React, { Component } from 'react'

export class ConexionDiagrama extends Component {
  render() {
    return (
      <div>
        <h2>Descargar diagrama (.mwb)</h2>
        <a href="/diagrama.mwb" download>
          📥 Descargar archivo MySQL Workbench
        </a>
      </div>
    )
  }
}

export default ConexionDiagrama