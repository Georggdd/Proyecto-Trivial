import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="">
      <Header />
      <main className="container mx-auto p-4 mt-32">
        <div className="flex justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Bienvenido al Trivial!
        </h2>
        <p className="text-gray-600">
          Comienza a jugar y pon a prueba tus conocimientos.
        </p>
        </div>
      </main>
    </div>
  );
}

export default App;
