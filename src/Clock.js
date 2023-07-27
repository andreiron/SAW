
function now (i ) {
    var now =  new Date();
    var ret = now.toLocaleString().split(',');

    return ret[i];
}

export default function Clock() {

    return (
        <h1 className=" p-3 w-fit text-3xl font-bold flex justify-center items-center underline relative bg-blue-500 flex-initial">
            {now(0)}
            {now(1)}
        </h1>
    )

}