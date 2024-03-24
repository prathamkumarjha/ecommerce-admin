"use client"

import { Modal } from "@/components/ui/modal"
import {useStoreModal} from "@/hooks/useStoreModal"


export const StoreModal = () => {
        const storeModal  = useStoreModal()
        return (
            <Modal 
            title="Store Name" 
            description="give a name to your store" 
            onClose={storeModal.onClose} 
            isOpen={storeModal.isOpen}>
            future store create form
            </Modal>  
        )

}