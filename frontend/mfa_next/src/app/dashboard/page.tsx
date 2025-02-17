export default function Dashboard() {
    const items = [
        1,2,3,5,6,7,9
    ]
    return (
        <div className="flex flex-row">
            <div id="sidebar" className="
                w-[250px]
                bg-primary 
                text-textPrimary
                h-svh
                rounded-e-2xl
            ">
                <div id="sidebar-header" className="
                    border-b-[1px] border-b-white p-4
                ">
                    <h1 className="text-[2rem]">title</h1>
                </div>
                <div id="sidebar-content" className="flex flex-col gap-1">
                    {
                        items.map(item => (
                            <button className="
                                flex
                                flex-row
                                items-center
                                transition-all
                                duration-100
                                w-full
                                px-2
                                py-1
                                text-[1.2rem]
                                active:bg-secondary
                                hover:bg-secondary/90
                                hover:rounded-s-full
                                hover:w-[98%]
                                hover:ps-4
                                hover:duration-2
                                hover:ms-auto
                                hover:text-[1.5rem]
                            ">
                                <i className="fa fa-gear me-3"></i>
                                <label>Setting</label>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div>
                href
            </div>
        </div>
    );
}
