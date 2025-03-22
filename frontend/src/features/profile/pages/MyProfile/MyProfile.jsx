import { BaseInfo } from '../../components/BaseInfo';
import { TestButton } from '../../components/TestButton';

export const MyProfile = () => {
    return(
        <>
        <div className="w-[55rem] flex p-10 rounded-3xl border-2 border-neutral-950">
            <BaseInfo/>
        </div>



        
        <br></br>
        <TestButton/>
        </>
        
    );
};
