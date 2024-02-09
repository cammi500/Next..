'use client';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { IonPage ,IonContent,IonItem, IonHeader, IonTitle, IonButton} from '@ionic/react';
import { log } from 'console';

export default function ProductPage(){

    const[products,setProducts] =useState<any>([]);

    useEffect(()=>{
        getProducts();

    },[1]);

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


    const handleDelete = async (item:any) => {
        await axios.delete('/product/api/'+item?.Id).then((res) =>{
            console.log("Delete Product",res.data);
            getProducts(); //after delete again show the list
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Product List</IonTitle>
            </IonHeader>
            <IonContent>
                {
                    products.map((item:any,index:number) => (
                        <IonItem key={index}>
                            {item?.Name}
                            <IonButton slot='end'>
                                {/* {start is left & end is right } */}
                                <IonButton onClick={()=>handleDelete(item)}>Delete</IonButton>
                            </IonButton>
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}