export const TestButton = () => {
    return (
        <div className="
            relative flex items-center
            justify-between p-4 px-7 overflow-hidden
            border rounded-xl
            border-slate-600/30 shadow-lg shadow-black/20 backdrop-blur-sm
            bg-grainy-gradient from-black/90 to-neutral-950/80
        ">
            <div className="flex items-center z-10">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-white">Amplitude</h3>
                    <p className="text-sm text-white/65">Use Amplitude to further analyze your user data.</p>
                </div>
            </div>
        </div>
    )
}