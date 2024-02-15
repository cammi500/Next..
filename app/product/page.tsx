'use client';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { IonPage ,IonContent,IonItem, IonHeader, IonTitle, IonButton, IonButtons, IonToolbar, IonLabel} from '@ionic/react';

export default function ProductPage(){

    const[products,setProducts] =useState<any>([]);

    useEffect(()=>{
        getProducts();
    },[1]);
//get
    const getProducts = async () => {
       await axios.get('/product/api')
        .then((res) =>{
            console.log("product Data",res.data);
            setProducts(res.data);
            
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    }

//delete
    const handleDelete = async (item:any) => {
        await axios.delete('/product/api/'+item?.Id).then((res) =>{
            console.log("Delete Product",res.data);
            getProducts(); //after delete again show the list
        })
    }

    //view
    const handleView =(item:any)=>{
        window.location.href ="/product/view/"+item?.Id;
    }
    //edit
    const handleEdit =(item:any) =>{
        window.location.href ="/product/edit/"+item?.Id;
    } 



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Product List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {
                    products.map((item:any,index:number) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <b>{item?.Name}</b>
                                <b>Buy Price :{item?.BuyPrice}</b>
                                <b>Sell Price :{item?.SellPrice}</b>

                            </IonLabel>

                            {/* {item?.Name} */}

                            <IonButtons slot="end">
                                <IonButton onClick={()=>handleView(item)} fill='outline' >View</IonButton>
                                <IonButton onClick={()=>handleView(item)} fill='outline' >Edit</IonButton>

                                {/* {start is left & end is right } */}
                                <IonButton onClick={()=>handleDelete(item)}>Delete</IonButton>
                            </IonButtons>
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}