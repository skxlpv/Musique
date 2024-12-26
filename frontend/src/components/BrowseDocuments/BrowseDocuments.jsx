import placeholderImage from "../../assets/placeholder.jpg"

export const BrowseDocuments = () => {
    const myList = [1,2,3,4,5,6,7,8,9,10]
    return(
        <div className="w-full h-full p-10 grid grid-flow-row grid-cols-3 gap-10">
            {myList.map((number) => {
                return(
                    <div className="outline-1 outline outline-neutral-500 rounded-sm h-60 w-full relative"
                    style={{
                        backgroundImage: `url(${placeholderImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden',
                    }}
                    >
                        <div className="h-20 w-full absolute bottom-0 px-3 py-2 backdrop-blur-sm"
                        style={{
                            boxShadow: '0px -10px 30px 10px rgba(0, 0, 0, 0.5)'
                        }}
                        >
                            <h3>Author: {"skxlpv"}</h3>
                            <h3>Title: {"title"}</h3>
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}