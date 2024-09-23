import React from 'react';
import { Button, Drawer } from 'antd';
import FilterCard from '../FilterCard';
const Draw = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    return (
        <div className='w-[20%]'>
            <Button type="primary" className='bg-gray-500 text-white' onClick={showLoading}>
                Filter Jobs
            </Button>
            <Drawer
                closable
                destroyOnClose
                title={<p>Loading Drawer</p>}
                placement="right"
                open={open}
                loading={loading}
                onClose={() => setOpen(false)}
            >
                <Button
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                    onClick={showLoading}
                >
                    Reload
                </Button>
                <FilterCard />
            </Drawer>
        </div>
    );
};
export default Draw;