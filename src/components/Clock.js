
function now (i ) {
    var now =  new Date();
    var ret = now.toLocaleString().split(',');
    return ret[i];
}

export default function Clock() {

    return (
        <h1 className=" p-3 w-fit text-3xl font-bold flex justify-center items-center underline relativeflex-initial">
            {now(0)}

        </h1>
    )

}