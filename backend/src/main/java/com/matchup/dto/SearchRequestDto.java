package com.matchup.dto;

import com.matchup.enums.LocalOperator;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchRequestDto {


    private String column;
    private List<String> values;

    private Operation operation;
    private LocalOperator operator;
    private String joinTable;


    public enum Operation {
        EQUAL, LIKE, IN, GREATER_THAN, LOWER_THAN, BETWEEN, JOIN
    }


}
