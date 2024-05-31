import Link from "next/link"

const MarketPlace = () => {
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Listed AI Models</h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        [0, 0, 0, 0, 0, 0].map((element) => {
                            return (
                                <div key={`element-${element}`} className="flex flex-col gap-3 rounded-lg border p-4 md:p-6">
                                    <div>
                                        <span className="block text-sm text-black font-bold md:text-base">Example AI</span>
                                        <span className="block text-sm text-gray-500">July 21, 2021</span>
                                    </div>
                                    <p className="text-gray-600">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.</p>
                                    <Link href="/marketplace/subscribe" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Subscribe</Link>
                               </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>


    )
}

export default MarketPlace