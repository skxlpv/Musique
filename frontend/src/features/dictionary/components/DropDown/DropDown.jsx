export const DropDown = ({dropDownData, isRoot, onChange}) => {
    return(
        <select className="bg-transparent outline-none button-card" onChange={onChange}>
            {dropDownData.map((key) => {
                return (
                    <option key={key} className="bg-black">
                        <h1 className="flex items-center bg-red-800">
                            {isRoot ? key + " Root" : key}
                        </h1>
                    </option>
                )
            })}
        </select>
    )
}