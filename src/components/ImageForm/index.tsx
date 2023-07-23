import React, { Fragment } from 'react'

import Section from '../Section/Section'
import AntdUploadVideo from '../UI/Upload/UploadVideo'
import FormItem from '../UI/FormItem'

const ImageForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control }) => {
    return (
        <Section>
            <Fragment>
                <h3 className='mb-3'>Video</h3>
                <FormItem className='mb-3'>
                    <AntdUploadVideo
                        listType='picture'
                        name='video'
                        control={control}
                    />
                </FormItem>
            </Fragment>
        </Section>
    )
}

export default ImageForm
