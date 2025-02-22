export const BoxContainer = ({containerHeader, fragments, styles}) => {
    return(
        <div className={`bg-gradient-to-b from-[#0D0D0D] from-50% to-[#000000] h-fit px-12 pt-6 pb-16 rounded-[10px] ${styles}`}>
            {containerHeader && <h1 className="text-4xl text-neutral-300 mb-2">{containerHeader}</h1>}
            {fragments}
        </div>
    )
}