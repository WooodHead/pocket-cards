import React, { FunctionComponent, useState } from 'react';
import * as Actions from '@actions/regist';
import Button from '@components/buttons/Button';
import WebCamera from '@components/WebCamera';
import { Grid, Theme, makeStyles, createStyles, Box } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Domains } from 'typings';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing(2)}px 0px`,
    },
    item: {
      padding: `${spacing()}px 0px`,
    },
  })
);

const app = (state: Domains.State) => state.app;

const a001: FunctionComponent<any> = () => {
  const classes = useStyles();
  const { isLoading } = useSelector(app);
  const [onAir, setOnAir] = useState(false);
  const actions = bindActionCreators(Actions, useDispatch());

  const startCamera = () => setOnAir(true);
  const afterStopCamera = () => setOnAir(false);

  const handleTest = () => actions.uploadImage(test);

  /** カメラ起動 */
  const handleCamera = (image: string) => actions.uploadImage(image);
  /** ファイルアップロードイベント */
  const handleImageUpload = () => {
    // カメラ停止
    afterStopCamera();

    const element = document.getElementById('uploadImage') as HTMLInputElement;

    if (!element) return;

    element.click();
  };

  /** ファイルアップロードイベント */
  const handleFileUpload = () => {
    // カメラ停止
    afterStopCamera();

    const element = document.getElementById('uploadFile') as HTMLInputElement;

    if (!element) return;

    element.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // ファイル選択なしか、クリアした
    if (!files || files.length === 0) {
      return;
    }

    const fr = new FileReader();

    fr.onload = (env: ProgressEvent) => {
      if (!env.target) return;

      const texts: string = (env.target as any).result;

      actions.uploadFile(texts);
    };

    fr.readAsDataURL(files[0]);
  };
  /** ファイルアップロード */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // ファイル選択なしか、クリアした
    if (!files || files.length === 0) {
      return;
    }

    const fr = new FileReader();

    fr.onload = (env: ProgressEvent) => {
      if (!env.target) return;

      const base64: string = (env.target as any).result;

      actions.uploadImage(base64);
    };

    fr.readAsDataURL(files[0]);
  };

  return (
    <Box display="flex" flexDirection="column" margin="8px 16px">
      <input type="file" id="uploadImage" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
      <input type="file" id="uploadFile" accept="*/*" style={{ display: 'none' }} onChange={handleFileChange} />

      <Button variant="contained" color="primary" fullWidth onClick={startCamera} size="large" isLoading={isLoading}>
        Take Photo
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleImageUpload}
        size="large"
        isLoading={isLoading}>
        Upload Photo
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleFileUpload}
        size="large"
        isLoading={isLoading}>
        Upload File
      </Button>
      <Box margin={1}>
        <WebCamera onAir={onAir} takePhoto={handleCamera} afterStopCamera={afterStopCamera} />
      </Box>
    </Box>
  );
};

export default a001;

const test =
  'data:image/jpeg;base64,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';
