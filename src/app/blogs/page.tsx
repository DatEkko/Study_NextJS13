'use client'
import TableUser from "@/components/table/TableUser";
import useSWR from "swr";

const Blogs = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
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
            <div style={{
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "600",
                margin: "10px 0"

            }}>
                List Blogs
            </div>
            <TableUser
                blogs={data?.sort((a: any, b: any) => b.id - a.id)}
            />
        </div>
    )
}

export default Blogs;