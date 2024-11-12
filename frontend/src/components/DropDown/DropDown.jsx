export const DropDown = ({dropDownData, isRoot, onChange}) => {
    return(
        <select className="bg-transparent outline-none" onChange={onChange}>
            {dropDownData.map((key) => {
                return (
                    <option key={key} className="bg-black">
                        <h1 className="flex items-center bg-red-800">
                            {key}
                        </h1>
                    </option>
                )
            })}
        </select>
    )
}