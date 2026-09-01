export default function CustomerPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Customer Page</h1>
            <p className="mt-4 text-lg text-gray-600">
                This is a protected customer page. Only authorized users can access this page.
            </p>
        </div>
    );
}