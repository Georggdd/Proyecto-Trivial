import Tablero from "./components/Tablero";

//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
export default function App() {
  return (
    <div className="w-screen h-screen">
      <div className="bg-tablero w-full h-full">

      <Tablero></Tablero>
      </div>
    </div>
  )
}