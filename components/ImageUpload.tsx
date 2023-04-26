import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled
}) => {
  const [base64, setBase64] = useState(value);

  /**
   * @desc 传入的onChange事件处理回调，当base64更新时调用
   */
  const handleChange = useCallback((base64: string) => {
    onChange(base64);
  }, [onChange])

  /**
   * @desc 拖拽文件结束后的回调
   */
  const handleDrop = useCallback((files: Array<File>) => {
    console.log('handleDrop', files);

    const file = files[0];
    const reader: FileReader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      let result: string | ArrayBuffer | null | undefined = event.target?.result;
      setBase64(result as string);
      handleChange(result as string);
    }
    reader.readAsDataURL(file);
  }, [handleChange])

  /**
   * @desc 使用Dropzone插件
   */
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, // 最多可接受的文件数
    onDrop: handleDrop,
    disabled, // 启用/禁用拖拽区
    accept: { // 接受的文件类型
      'image/jpeg' : [],
      'image/png': []
    }
  });

  return (
    <div {...getRootProps({
      className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer'
    })}>
      <input {...getInputProps()} />
      {
        base64 ? (
          <div className="flex items-center justify-center">
            <Image src={base64} height="100" width="100" alt="Upload image" />
          </div>
        ) : (
          <p className="text-white">{label}</p>
        )
      }
    </div>
  )
}

export default ImageUpload;