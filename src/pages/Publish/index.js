import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useState, useRef, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;
const { TextArea } = Input;


const Publish = () => {
  const { channelStore } = useStore();

  //图片上传部分
  // 1. 声明一个暂存仓库
  const fileListRef = useRef([]);
  const [fileList, setFileList] = useState([]);
  // 上传成功回调
  const onUploadChange = (info) => {
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      return file;
    });
    setFileList(fileList);
    // 2. 上传图片时，将所有图片存储到 ref 中
    fileListRef.current = fileList;
  };


  //视频上传部分
  const [fileListVideo, setFileListVideo] = useState([]);
  const onUploadVideoChange = () => {
    console.log('onUploadVideoChange: ', onUploadVideoChange);
  }


  // 发布
  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title } = values;
    const params = {
      title,
      channel_id,
      content,
    };
    try {
      if (articleId) {
        // 编辑
        await http.put(`/mp/articles/${articleId}?draft=false`, params);
      } else {
        // 新增
        await http.post("/mp/articles?draft=false", params);
      }
    } catch (error) {
      console.log("error: ", error);
    }
    // 提示用户
    navigator("/article");
    message.success(`${articleId}` ? "更新成功" : "发布成功");
  };

  // 回显编辑文章
  const [params] = useSearchParams();
  const articleId = params.get("id");
  // 数据回填  id调用接口  1.表单回填 2.暂存列表 3.Upload组件fileList
  const [form] = Form.useForm();

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await http.get(`/mp/articles/${articleId}`);
        const { cover, ...formValue } = res.data;
        // 动态设置表单数据
        form.setFieldsValue({ ...formValue, type: cover.type });
        // 格式化封面图片数据
        const imageList = cover.images.map((url) => ({ url }));
        setFileList(imageList);
        fileListRef.current = imageList;
      } catch (error) {
        console.log("error: ", error);
      }
    }
    if (articleId) {
      // 拉取数据回显
      getArticle();
    }
  }, [articleId, form]); //事实上只需要发送一次及就可以了，填上id是为了解决警告问题

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {" "}
              {articleId ? "修改" : "发布"}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            className="form-item"
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            {/* style={{ width: 400 }} */}
            <Input placeholder="请输入文章标题"  />
          </Form.Item>
          <Form.Item
            className="form-item"
            label="分类"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章分类" }]}
          >
            <Select placeholder="请选择文章分类" >
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="form-item"
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <TextArea placeholder="请输入文章内容" rows={4} />
          </Form.Item>

          <Form.Item label="图片" className="form-item">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                multiple
                action="http://123"
                accept="image/*"
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined className="upload-icon" />
                </div>
              </Upload>
          </Form.Item>

          <Form.Item label="视频" className="form-item">
              <Upload
                name="video"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                multiple
                action="http://123"
                accept="video/*"
                fileList={fileListVideo}
                onChange={onUploadVideoChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined className="upload-icon" />
                </div>
              </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "修改" : "发布"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
