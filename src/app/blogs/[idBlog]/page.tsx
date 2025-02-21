'use client'
import useSWR, { Fetcher } from "swr";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";

const ViewDetailBlog = ({ params }: { params: { idBlog: string } }) => {

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${params.idBlog}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) {
        return <div>...is loading</div>
    }

    return (
        <div className="container">
            <Link href={'/blogs'} className="btn btn-primary my-3">Back</Link>
            <Card className="text-center">
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {data?.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
            </Card>

        </div>
    )
}

export default ViewDetailBlog;