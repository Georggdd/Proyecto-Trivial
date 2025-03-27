import React from 'react';
const Hamburger = () => {

    return (
        <>

            <header className="flex justify-between mx-5 my-5">
                <div className="text-3xl font-bold">Menú </div>
                <nav className="text-xs flex items-center">
                    <input type="checkbox" id="menu" className="peer hidden" />
                    <label htmlFor="menu" className="z-30 bg-hamburguesa_cerrada peer-checked:bg-logoPrincipal block w-10 h-5 bg-cover bg-center cursor-pointer transition-all">
                    </label>
                    <div className="fixed inset-0 w-full bg-gray-700/75 translate-x-full peer-checked:translate-x-0 transition-transformflex justify-end">
                        <ul className="flex flex-col gap-5 text-lg pt-40 pl-5 bg-white h-full w-60">
                            <li>Home</li>
                            <li>Casa</li>
                            <li>Hogar</li>
                            <li>Lugar</li>
                            <li>Paz</li>
                        </ul>
                    </div>
                </nav>
            </header >



        </>
    );

}


export default Hamburger;
