'use client';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { IonPage ,IonContent,IonItem, IonHeader, IonTitle} from '@ionic/react';

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
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}