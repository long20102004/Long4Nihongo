package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class SectionContentResponse {
    private String sectionType;
    private List<?> content;
}
