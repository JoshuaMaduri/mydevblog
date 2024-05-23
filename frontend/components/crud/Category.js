import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory, singleCategory } from '../../actions/category';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const [modal, setModal] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState('');

    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories()
    }, [reload])

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setValues(values => ({ ...values, categories: data }))
            }
        });
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                
                <div className='btn-group' role='group' key={i}>
                    <button 
                        title = "Double click to delete" 
                        type="button" 
                        className="btn btn-outline-primary mr-1 ml-1 mt-3" 
                        onClick={() => toggleModal(c.slug)}>
                        <span>{c.name}</span>
                        <i className="bi bi-x ml-2 delete-icon"></i>
                    </button>
                </div>
            )
        });
    };

    const toggleModal = (slug = '') => {
        setDeleteSlug(slug);
        setModal(!modal);
    };

    const deleteCategory = () => {
        if (deleteSlug) {
            removeCategory(deleteSlug, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues(values => ({
                        ...values,
                        error: false,
                        success: false,
                        name: '',
                        removed: true,
                        reload: !reload
                    }));
                    toggleModal();
                }
            });
        }
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues(values => ({ ...values, error: data.error, success: false }));
            } else {
                setValues(values => ({ ...values, error: false, success: true, name: '', removed: false, reload: !reload }));
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Category created successfully</p>;
        }
    }

    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exists</p>;
        }
    }
    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category removed successfully</p>;
        }
    }

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
    );

    return <React.Fragment>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        {newCategoryFom()}
        
        {showCategories()}
        

        <Modal isOpen={modal} toggle={() => toggleModal('')}>
            <ModalHeader toggle={() => toggleModal('')} close={<button className="close" onClick={() => toggleModal('')}>&times;</button>}>
                Delete Category
            </ModalHeader>   
                <ModalBody>
                    Are you sure you want to delete this category?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteCategory}>Delete</Button>
                    <Button color="secondary" onClick={() => toggleModal('')}>Cancel</Button>
                </ModalFooter>
            </Modal>

    </React.Fragment>;
};

export default Category;