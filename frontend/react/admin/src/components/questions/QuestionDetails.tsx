import React, { createRef, FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Group, QuestionForm } from 'typings';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton } from '@mui/material';
import { Consts } from '@constants';

const titleRef = createRef<HTMLAudioElement>();
const answerRef = createRef<HTMLAudioElement>();

const styles = {
  container: {
    width: 'calc(100vw - 232px)',
  },
  tableCell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: 95 / 100,
  },
};

const details: FunctionComponent<QuestionDetails> = ({ dataRow, loading, onClick, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>({
    defaultValues: {
      id: dataRow.id,
      title: dataRow.title ?? '',
      answer: dataRow.answer ?? '',
      choices: dataRow.choices?.join('|'),
      description: dataRow.description ?? '',
      original: dataRow.original,
      groupId: dataRow.groupId,
    },
  });

  // 編集
  const onSubmit = handleSubmit((datas) => onClick?.(datas));

  const handlePlayQuestion = () => {
    if (!window.location.hostname.startsWith('localhost')) {
      titleRef.current?.play();
    }
  };

  const handlePlayAnswer = () => {
    if (!window.location.hostname.startsWith('localhost')) {
      answerRef.current?.play();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input {...register('groupId')} hidden />
      <Box margin={2} sx={{ width: '640px' }}>
        <Controller
          name="id"
          control={control}
          render={({ field: { value } }) => (
            <TextField disabled={true} variant="outlined" margin="normal" fullWidth label="ID" value={value} />
          )}
        />
        <Box sx={{ display: 'flex' }}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                disabled={!onClick}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Title"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {dataRow.voiceAnswer && [
            <IconButton key="questionPlayBtn" sx={{ mx: 1 }} color="secondary" onClick={handlePlayQuestion}>
              <VolumeUpIcon />
            </IconButton>,
            <audio
              key="questionAudio"
              ref={titleRef}
              src={`/${Consts.PATH_VOICE}/${dataRow.groupId}/${dataRow.voiceTitle}`}
            />,
          ]}
        </Box>
        {dataRow.original && (
          <Controller
            name="original"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                disabled={!onClick}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Original"
                value={value}
                onChange={onChange}
              />
            )}
          />
        )}

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Description"
              value={value}
              onChange={onChange}
            />
          )}
        />
        {dataRow.choices && (
          <Controller
            name="choices"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                disabled={!onClick}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Choices"
                value={value}
                onChange={onChange}
              />
            )}
          />
        )}

        <Box sx={{ display: 'flex' }}>
          <Controller
            name="answer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                disabled={!onClick}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Answer"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {dataRow.voiceAnswer && [
            <IconButton key="answerPlayBtn" sx={{ mx: 1 }} color="secondary" onClick={handlePlayAnswer}>
              <VolumeUpIcon />
            </IconButton>,
            <audio
              key="answerAudio"
              ref={answerRef}
              src={`/${Consts.PATH_VOICE}/${dataRow.groupId}/${dataRow.voiceAnswer}`}
            />,
          ]}
        </Box>
      </Box>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          key="closeBtn"
          size="large"
          variant="contained"
          color="secondary"
          sx={{ mx: 1, width: 120 }}
          onClick={onClose}
        >
          CLOSE
        </Button>
        {onClick && (
          <LoadingButton
            key="loadingBtn"
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
            sx={{ mx: 1, width: 120 }}
          >
            SUBMIT
          </LoadingButton>
        )}
      </Box>
    </form>
  );
};

interface QuestionDetails {
  readonly?: boolean;
  loading?: boolean;
  dataRow: Group.Question;
  onClick?: (form: QuestionForm) => void;
  onClose?: () => void;
}

export default details;
