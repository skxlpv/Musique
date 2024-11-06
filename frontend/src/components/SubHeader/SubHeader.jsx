import "../SubHeader/SubHeader.css"

export const SubHeader = () => {
    return (
        <div className="flex w-full items-center justify-center absolute top-20 h-24">
            <ul className="gap-4 text-xl flex flex-row items-center">
                <li className="list-item-hover button-card">
                    <a className="cursor-default" href="/">🎨Artists Page</a>
                </li>
                <li className="list-item-hover button-card">
                    <a className="cursor-default" href="/">🎵Musicians Page</a>
                </li>
                <li className="list-item-hover button-card">
                    <a className="cursor-default" href="/">🎭Theatre Artists Page</a>
                </li>
                <li className="list-item-hover button-card">
                    <a className="cursor-default" href="/auth">📝Writers Page</a>
                </li>
                <li className="list-item-hover button-card">
                    <a className="cursor-default" href="/auth">🧶Craftspeople Page</a>
                </li>
            </ul>
        </div>
    );
};
