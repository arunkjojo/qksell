import UploadContainer from '@components/image/UploadContainer';

export const ImageUpload = () => {
    return (
        <main className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Post Image Upload
                    </h1>
                </div>

                <UploadContainer />

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                        How It Works
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2 text-blue-800">
                        <li>Select or drag & drop images of any size</li>
                        <li>Files are uploaded to Firebase Storage</li>
                        <li>The backend handles compression automatically</li>
                        <li>References are sent to your PHP API for further processing</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}