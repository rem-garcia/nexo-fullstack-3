interface SidebarMenuProps {
    openMenu: boolean;
    handleMenu: () => void;
};

const SidebarMenu = ({openMenu, handleMenu}: SidebarMenuProps) => {
    const navItems = [
        {id: 1, name: "Home", iconClass: "fa-solid fa-house-user", path: ""},
        {id: 2, name: "Propiedades", iconClass: "fa-solid fa-building", path: ""},
        {id: 3, name: "Reclamos", iconClass: "fa-solid fa-circle-exclamation", path: ""}
    ];

    const fechaFooter = new Date();

    return(
        <aside
            className={`flex flex-col justify-between fixed lg:static min-h-full ${openMenu ? "min-w-1/2 md:min-w-2/5 opacity-100" : "w-0 overflow-x-hidden opacity-0"} lg:opacity-100 lg:min-w-1/5 2xl:min-w-3/20 text-gray-primary bg-blue-primary transition-all duration-500 ease-in-out`}
        >
            <div>
                {/* Boton para cerrar sidebar */}
                <div className="lg:hidden my-2 mr-4 text-2xl text-right">
                    <button className="cursor-pointer" onClick={handleMenu}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Posiblemente ira junto con el logo(?) */}
                <h2 className="pb-8 lg:py-8 text-center text-xl border-b border-b-blue-secondary font-bold">Nexo</h2>
        
                {/* Navegacion */}
                <nav>
                    <ul className="mt-4">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className="px-3 py-4 mx-4 rounded-lg hover:bg-[#0f4070] cursor-pointer"
                        >
                            <i className={`${item.iconClass} mr-[5px]`}></i>
                            <span>{item.name}</span>
                        </li>
                    ))}
                    </ul>
                </nav>
            </div>
        
            {/* Footer Sidebar */}
            <div>
                <p className="py-8 border-t border-t-blue-secondary text-center font-bold">{`Nexo @${fechaFooter.getFullYear()}`}</p>
            </div>
        </aside>
    );
};

export default SidebarMenu;