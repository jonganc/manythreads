/* eslint-disable import/no-extraneous-dependencies */
/* global expect */
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));
