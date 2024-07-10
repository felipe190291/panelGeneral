import { create } from 'zustand'

type Store = {
  count: number,
  stepIndex:number,
  setStepIndex: (value:any) => void,
  run:boolean,setRun:(run:boolean)=>void
}

export const useUIStore = create<Store>()((set) => ({
  count: 1,
  stepIndex:0,
  setStepIndex: (value:any) => set((state) => ({ stepIndex:  value })),
  setRun:(run:boolean)=>set((state)=>({
    run:run,
  })),
  run:false
}))

