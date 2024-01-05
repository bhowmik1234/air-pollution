export default function UserProfile({ params }: any) {
    return (
        <div className=" flex flex-col items-center justify-center  min-h-screen">
            <h1 className="text-3xl">User Profile</h1>
            <br />
            <h2 className="text-4xl"> this is a params <span className="p-3 bg-orange-500 rounded-lg text-2xl">{params.id}</span></h2>
        </div>
    );
}