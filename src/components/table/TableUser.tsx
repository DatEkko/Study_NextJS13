'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import ModalAddNewBlog from '../modal/modalAddBlog';
import { useState } from 'react';
import ModalEditBlog from '../modal/modalEditBlog';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';


interface IProps {
    blogs: IBlog[]
}

const TableUser = (props: IProps) => {
    const { blogs } = props;
    const [isShowAddNewModal, setIsShowAddNewModal] = useState<boolean>(false);
    const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
    const [blogEdit, setBlogEdit] = useState<IBlog | null>(null);

    const handleEditBlog = (item: IBlog) => {
        setIsShowEditModal(true);
        setBlogEdit(item);
    }

    const handleDeleteBlog = (id: number) => {
        if (confirm(`Mày có chắc là sẽ xóa bài viết số ${id} chứ?`)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        toast.success("Create succeed!!!");
                        mutate("http://localhost:8000/blogs")
                    } else {
                        toast.error("Create fail!!!")
                    }
                })
        }
    }

    return (
        <>
            <div className='btn-add-new'>
                <Button
                    className='btn btn-primary'
                    style={{ margin: "20px 0", float: "right" }}
                    onClick={() => setIsShowAddNewModal(true)}
                >
                    Create New Blog
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>

                                    <Link className='btn btn-secondary' href={`/blogs/${item.id}`}>View</Link>

                                    <Button
                                        onClick={() => handleEditBlog(item)}
                                        className='btn btn-warning mx-3'
                                    >Edit</Button>

                                    <Button
                                        onClick={() => handleDeleteBlog(item.id)}
                                        className='btn btn-danger'>Delete</Button>
                                </td>
                            </tr>

                        )
                    })
                    }
                </tbody>
            </Table>

            <ModalAddNewBlog
                show={isShowAddNewModal}
                setShow={setIsShowAddNewModal}
            />

            <ModalEditBlog
                show={isShowEditModal}
                setShow={setIsShowEditModal}
                blogEdit={blogEdit}
                setBlogEdit={setBlogEdit}
            />
        </>

    )
}

export default TableUser;